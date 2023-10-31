export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-history', link: '/system/user-history' },
                    { name: 'menu.system.system-administrator.user-keyboard-log', link: '/system/user-keyboard-log' },
                    { name: 'menu.system.system-administrator.user-block-web', link: '/system/user-block-website' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];