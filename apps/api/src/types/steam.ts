interface SteamPlayer {
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  communityvisibilitystate: CommunityVisibilityStates;
  lastlogoff: number;
  personaname: string;
  personastate: PersonaStates;
  profileurl: string;
  steamid: string;
  accountname?: string;
  commentpermission?: 1;
  gameextrainfo?: string;
  gameid?: number;
  gameserverip?: string;
  loccityid?: number;
  loccountrycode?: string;
  locstatecode?: string;
  personastateflags?: number;
  primaryclanid?: string;
  profilestate?: 1;
  realname?: string;
  timecreated?: number;
}

type CommunityVisibilityStates = 1 | 3;

type PersonaStates = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface SteamUserInfo {
  response: {
    players: SteamPlayer[];
  };
}

export interface SteamMonitorConfig {
  status: "running" | "stopped";
}
