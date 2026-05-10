/** Flexible shapes returned by GET /api/v1/clients */
export type ClientListItem = Record<string, unknown>;

export function parseClientsListResponse(data: unknown): {
  items: ClientListItem[];
  total: number;
} {
  if (data == null) return { items: [], total: 0 };

  if (Array.isArray(data)) {
    return { items: data as ClientListItem[], total: data.length };
  }

  if (typeof data !== "object") return { items: [], total: 0 };
  const d = data as Record<string, unknown>;

  const pickTotal = (obj: Record<string, unknown>): number | undefined => {
    const t = obj.total ?? obj.totalCount ?? obj.count;
    if (typeof t === "number" && !Number.isNaN(t)) return t;
    if (typeof t === "string") {
      const n = Number(t);
      return Number.isNaN(n) ? undefined : n;
    }
    return undefined;
  };

  if (Array.isArray(d.data)) {
    const meta = d.meta && typeof d.meta === "object" ? (d.meta as Record<string, unknown>) : null;
    const fromMeta = meta ? pickTotal(meta) : undefined;
    const total = pickTotal(d) ?? fromMeta ?? d.data.length;
    return { items: d.data as ClientListItem[], total };
  }

  const nested = d.data;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    const inner = nested as Record<string, unknown>;
    if (Array.isArray(inner.items)) {
      const total = pickTotal(inner) ?? pickTotal(d) ?? inner.items.length;
      return { items: inner.items as ClientListItem[], total };
    }
  }

  if (Array.isArray(d.clients)) {
    const total = pickTotal(d) ?? d.clients.length;
    return { items: d.clients as ClientListItem[], total };
  }

  if (Array.isArray(d.results)) {
    const total = pickTotal(d) ?? d.results.length;
    return { items: d.results as ClientListItem[], total: total };
  }

  return { items: [], total: 0 };
}

export function clientDisplayName(row: ClientListItem): string {
  const fn = row.firstName;
  const ln = row.lastName;
  if (typeof fn === "string" || typeof ln === "string") {
    return [fn, ln].filter((x) => typeof x === "string" && x.trim() !== "").join(" ").trim();
  }
  if (typeof row.name === "string" && row.name.trim()) return row.name;
  if (typeof row.fullName === "string" && row.fullName.trim()) return row.fullName;
  return "—";
}

export function clientEmail(row: ClientListItem): string {
  const e = row.email;
  return typeof e === "string" ? e : "—";
}

export function clientAddedBy(row: ClientListItem): string {
  const direct =
    row.addedBy ??
    row.addedByName ??
    row.createdByName ??
    (typeof row.user === "object" && row.user !== null
      ? (row.user as Record<string, unknown>).name ??
        (row.user as Record<string, unknown>).email
      : undefined);
  if (typeof direct === "string" && direct.trim()) return direct;
  return "—";
}

export function clientDateAdded(row: ClientListItem): string {
  const raw =
    row.createdAt ??
    row.dateAdded ??
    row.created_at ??
    row.updatedAt ??
    row.dateCreated;
  if (typeof raw === "string" && raw) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return raw;
  }
  return "—";
}
