export type Avatar = 'small' | 'small-two' | 'medium' | 'large'

export interface IAvatar {
  image?: string;
  username?: string;
  className?: string;
  variant?: Avatar
}
