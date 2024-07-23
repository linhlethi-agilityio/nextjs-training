// Utils
import { generateShades } from '@/utils';

export const brandColors = {
  primary: '#003CFF',
};

export const systemColors = {
  raisinBlack: '#1D1929',
  darkGray: '#ABABAB',
  mistyRose: '#FDD4D4',
  grannyApple: '#DCFDD4',
  lightBlue: '#E1E8FF',
  auburn: '#AC1616',
  green: '#007f3f',
  citron: '#705f1a',
  lightYellow: '#FAFDD4',
  white: '#FFFFFF',
  lightRose: '#E2E8F0',
  culturedPearl: '#F7F8FA',
  lightGray: '#E9E9EA',
};

export const colors = {
  brand: {
    primary: brandColors.primary,
    ...generateShades(brandColors.primary),
  },
  warning: generateShades(systemColors.citron),
  negative: generateShades(systemColors.green),
  info: generateShades(systemColors.raisinBlack),
  red: generateShades(systemColors.auburn),

  // Texts
  textDark: systemColors.raisinBlack,
  textPrimary: brandColors.primary,
  textLight: systemColors.white,
  textDefault: systemColors.darkGray,
  textPendingStatus: systemColors.citron,
  textRejectedStatus: systemColors.auburn,
  textCompleteStatus: systemColors.green,

  // Backgrounds
  backgroundPrimary: brandColors.primary,
  backgroundLight: systemColors.white,
  backgroundDark: systemColors.darkGray,
  backgroundSiBarItem: systemColors.lightBlue,
  backgroundDashboard: systemColors.culturedPearl,
  backgroundPendingStatus: systemColors.lightYellow,
  backgroundRejectedStatus: systemColors.mistyRose,
  backgroundCompleteStatus: systemColors.grannyApple,

  // Borders
  borderDefault: systemColors.lightGray,
  borderPrimary: systemColors.lightBlue,
  borderInput: systemColors.lightRose,
};
