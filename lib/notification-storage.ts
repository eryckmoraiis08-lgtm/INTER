import AsyncStorage from "@react-native-async-storage/async-storage";

export type NotificationCustomization = {
  senderName: string;
  imageUri: string | null;
};

export type NotificationRecord = NotificationCustomization & {
  id: string;
  subject: string;
  createdAt: string;
  notificationId?: string;
};

export type NotificationTemplate = NotificationCustomization & {
  id: string;
  name: string;
  subject: string;
  createdAt: string;
};

export type NotificationPreferences = {
  hapticsEnabled: boolean;
};

const DEFAULT_CUSTOMIZATION: NotificationCustomization = {
  senderName: "",
  imageUri: null,
};

const HISTORY_KEY = "notificacao-premium:history";
const DRAFT_KEY = "notificacao-premium:draft";
const TEMPLATES_KEY = "notificacao-premium:templates";
const PREFERENCES_KEY = "notificacao-premium:preferences";

export async function readHistory(): Promise<NotificationRecord[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Array<Partial<NotificationRecord> & { title?: unknown }>;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `${Date.now()}-${index}`,
      subject: typeof item.subject === "string" ? item.subject : "",
      createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
      notificationId: typeof item.notificationId === "string" ? item.notificationId : undefined,
      senderName:
        typeof item.senderName === "string"
          ? item.senderName
          : typeof item.title === "string"
            ? item.title
            : "",
      imageUri: typeof item.imageUri === "string" ? item.imageUri : null,
    }));
  } catch {
    return [];
  }
}

export async function addToHistory(record: NotificationRecord): Promise<void> {
  const history = await readHistory();
  const nextHistory = [record, ...history].slice(0, 30);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}

export async function saveDraft(
  senderName: string,
  subject: string,
  customization: Partial<NotificationCustomization> = {},
): Promise<void> {
  await AsyncStorage.setItem(
    DRAFT_KEY,
    JSON.stringify({
      senderName,
      subject,
      imageUri: customization.imageUri ?? DEFAULT_CUSTOMIZATION.imageUri,
    }),
  );
}

export async function consumeDraft(): Promise<{
  senderName: string;
  subject: string;
  imageUri: string | null;
} | null> {
  const raw = await AsyncStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  await AsyncStorage.removeItem(DRAFT_KEY);

  try {
    const parsed = JSON.parse(raw) as {
      senderName?: unknown;
      title?: unknown;
      subject?: unknown;
      imageUri?: unknown;
    };
    return {
      senderName:
        typeof parsed.senderName === "string"
          ? parsed.senderName
          : typeof parsed.title === "string"
            ? parsed.title
            : "",
      subject: typeof parsed.subject === "string" ? parsed.subject : "",
      imageUri: typeof parsed.imageUri === "string" ? parsed.imageUri : null,
    };
  } catch {
    return null;
  }
}

export async function readTemplates(): Promise<NotificationTemplate[]> {
  const raw = await AsyncStorage.getItem(TEMPLATES_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Array<Partial<NotificationTemplate>>;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => typeof item.name === "string" && typeof item.subject === "string")
      .map((item, index) => ({
        id: typeof item.id === "string" ? item.id : `${Date.now()}-${index}`,
        name: item.name?.trim() || `Modelo ${index + 1}`,
        senderName: typeof item.senderName === "string" ? item.senderName : "",
        subject: item.subject?.trim() ?? "",
        imageUri: typeof item.imageUri === "string" ? item.imageUri : null,
        createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
      }));
  } catch {
    return [];
  }
}

export async function addTemplate(template: NotificationTemplate): Promise<void> {
  const templates = await readTemplates();
  const nextTemplates = [template, ...templates].slice(0, 20);
  await AsyncStorage.setItem(TEMPLATES_KEY, JSON.stringify(nextTemplates));
}

export async function deleteTemplate(id: string): Promise<void> {
  const templates = await readTemplates();
  await AsyncStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates.filter((template) => template.id !== id)));
}

export async function readPreferences(): Promise<NotificationPreferences> {
  const raw = await AsyncStorage.getItem(PREFERENCES_KEY);
  if (!raw) return { hapticsEnabled: true };

  try {
    const parsed = JSON.parse(raw) as Partial<NotificationPreferences>;
    return { hapticsEnabled: parsed.hapticsEnabled !== false };
  } catch {
    return { hapticsEnabled: true };
  }
}

export async function savePreferences(preferences: NotificationPreferences): Promise<void> {
  await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}
