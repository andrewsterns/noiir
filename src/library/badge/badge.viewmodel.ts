import type { BadgeProps, BadgeViewModel } from './badge.interface.ts'

export const useBadgeViewModel = ({ tone = 'default', ...props }: BadgeProps): BadgeViewModel => ({
  frame: { as: 'span', ...props, tone },
})
