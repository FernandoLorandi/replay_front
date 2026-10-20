export const HOME_INTRO_SESSION_KEY = 'replay:home-intro-v2-seen';

export function shouldPlayHomeIntro(value: string | null): boolean {
  return value !== 'seen';
}
