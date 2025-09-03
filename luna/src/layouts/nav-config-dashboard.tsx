import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  subpaths: icon('ic-subpaths'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * 메인 메뉴
   */
  {
    subheader: '메인',
    items: [
      {
        title: '홈',
        path: '/',
        icon: ICONS.dashboard,
      },
      { title: '채용공고', path: '/jobs', icon: ICONS.job },
      { title: '프로필', path: '/profile', icon: ICONS.user },
    ],
  },
  /**
   * 서비스
   */
  {
    subheader: '서비스',
    items: [
      {
        title: '쇼케이스',
        path: '/showcase',
        icon: ICONS.label,
      },
      {
        title: '기업정보',
        path: '/companies',
        icon: ICONS.ecommerce,
      },
      {
        title: '커뮤니티',
        path: '/community',
        icon: ICONS.chat,
      },
    ],
  },
  /**
   * 계정
   */
  {
    subheader: '계정',
    items: [
      {
        title: '설정',
        path: '/settings',
        icon: ICONS.params,
        children: [
          { title: '개인정보', path: '/settings/profile' },
          { title: '알림설정', path: '/settings/notifications' },
          { title: '보안설정', path: '/settings/security' },
        ],
      },
    ],
  },
];
