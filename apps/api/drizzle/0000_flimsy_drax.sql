CREATE TABLE `emails` (
	`email` text(100) PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sensibo_actions` (
	`id` integer PRIMARY KEY NOT NULL,
	`pod_id` text(20) NOT NULL,
	`enabled` integer NOT NULL,
	`priority` integer NOT NULL,
	`name` text NOT NULL,
	`current_mode` text,
	`room_temp_above` integer,
	`room_temp_below` integer,
	`outdoor_temp_above` integer,
	`outdoor_temp_below` integer,
	`time_hour_after` integer,
	`time_hour_before` integer,
	`on` integer,
	`mode` text,
	`fan_level` text,
	`target_temperature` integer,
	`swing` text,
	`light` text,
	FOREIGN KEY (`pod_id`) REFERENCES `sensibo_pods`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sensibo_pods` (
	`id` text(20) PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `twitch_clients` (
	`client_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`client_secret` text NOT NULL,
	`redirect_uri` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `twitch_states` (
	`id` integer PRIMARY KEY NOT NULL,
	`twitch_client_id` text NOT NULL,
	`state` text(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`expires_in` integer,
	`scopes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`twitch_client_id`) REFERENCES `twitch_clients`(`client_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `type_idx` ON `emails` (`type`);--> statement-breakpoint
CREATE INDEX `pod_idx` ON `sensibo_actions` (`pod_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `sensibo_actions` (`name`);--> statement-breakpoint
CREATE INDEX `current_mode_idx` ON `sensibo_actions` (`current_mode`);--> statement-breakpoint
CREATE INDEX `client_idx` ON `twitch_states` (`twitch_client_id`);