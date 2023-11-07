import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { type InferInsertModel, type InferSelectModel, type SQL, relations, sql } from "drizzle-orm";
import { acFanLevels, acLightModes, acModes, acSwingModes } from "../types";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

function parseModifiers(...modifiers: string[]): string {
  let modifierString = "";
  modifiers.forEach((modifier, idx) => {
    modifierString += `'${modifier}'`;
    if (idx < modifiers.length - 1) {
      modifierString += `, `;
    }
  });
  return modifierString;
}

export function datetime(...modifiers: string[]): SQL {
  return sql.raw(`datetime(${parseModifiers(...modifiers)})`);
}

export const emails = sqliteTable(
  "emails",
  {
    email: text("email", { length: 100 }).primaryKey(),
    type: text("type", { enum: ["from", "to"] }).notNull(),
    enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  },
  (table) => {
    return {
      typeIdx: index("type_idx").on(table.type),
    };
  },
);

export type Email = InferSelectModel<typeof emails>;
export type NewEmail = InferInsertModel<typeof emails>;

export const sensiboPods = sqliteTable("sensibo_pods", {
  id: text("id", { length: 20 }).primaryKey(),
  name: text("name").notNull(),
});

export type SensiboPod = InferSelectModel<typeof sensiboPods>;
export type NewSensiboPod = InferInsertModel<typeof sensiboPods>;

export const sensiboActions = sqliteTable(
  "sensibo_actions",
  {
    id: integer("id").primaryKey(),
    podId: text("pod_id", { length: 20 })
      .references(
        () => {
          return sensiboPods.id;
        },
        { onDelete: "cascade", onUpdate: "cascade" },
      )
      .notNull(),
    enabled: integer("enabled", { mode: "boolean" }).notNull(),
    priority: integer("priority").notNull(),
    name: text("name").notNull(),
    currentMode: text("current_mode", { enum: [...acModes, "off"] }),
    roomTempAbove: integer("room_temp_above"),
    roomTempBelow: integer("room_temp_below"),
    outdoorTempAbove: integer("outdoor_temp_above"),
    outdoorTempBelow: integer("outdoor_temp_below"),
    timeHourAfter: integer("time_hour_after"),
    timeHourBefore: integer("time_hour_before"),
    on: integer("on", { mode: "boolean" }),
    mode: text("mode", { enum: acModes }),
    fanLevel: text("fan_level", { enum: acFanLevels }),
    targetTemperature: integer("target_temperature"),
    swing: text("swing", { enum: acSwingModes }),
    light: text("light", { enum: acLightModes }),
  },
  (table) => {
    return {
      podIdx: index("pod_idx").on(table.podId),
      nameIdx: index("name_idx").on(table.name),
      currentModeIdx: index("current_mode_idx").on(table.currentMode),
    };
  },
);

export type SensiboAction = InferSelectModel<typeof sensiboActions>;
export type NewSensiboAction = InferInsertModel<typeof sensiboActions>;

export const twitchClients = sqliteTable("twitch_clients", {
  clientId: text("client_id").primaryKey(),
  name: text("name").notNull(),
  clientSecret: text("client_secret").notNull(),
  redirectUri: text("redirect_uri").notNull(),
});

export type TwitchClient = InferSelectModel<typeof twitchClients>;

export const twitchStates = sqliteTable(
  "twitch_states",
  {
    id: integer("id").primaryKey(),
    twitchClientId: text("twitch_client_id")
      .references(() => {
        return twitchClients.clientId;
      })
      .notNull(),
    state: text("state", { length: 36 }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresIn: integer("expires_in"),
    scopes: text("scopes"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      clientIdx: index("client_idx").on(table.twitchClientId),
    };
  },
);

export type TwitchState = InferSelectModel<typeof twitchStates>;
export type NewTwitchState = InferInsertModel<typeof twitchStates>;

export const sensiboPodRelations = relations(sensiboPods, ({ many }) => {
  return {
    actions: many(sensiboActions),
  };
});

export const sensiboActionRelations = relations(sensiboActions, ({ one }) => {
  return {
    pod: one(sensiboPods, { fields: [sensiboActions.podId], references: [sensiboPods.id] }),
  };
});

export const twitchStateRalations = relations(twitchStates, ({ one }) => {
  return {
    twitchClient: one(twitchClients, {
      fields: [twitchStates.twitchClientId],
      references: [twitchClients.clientId],
    }),
  };
});

export const schema = {
  emails,
  sensiboPods,
  sensiboActions,
  twitchClients,
  twitchStates,
  sensiboPodRelations,
  sensiboActionRelations,
  twitchStateRalations,
};

export default function getDrizzle(db: D1Database): DrizzleD1Database<typeof schema> {
  return drizzle(db, { schema });
}
