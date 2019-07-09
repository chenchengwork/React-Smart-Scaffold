import EnumRouter from '@/constants/EnumRouter';


export default  [
    {
        uri: EnumRouter.screen,
        component: import("@/pages/Screen"),
        stores: require("@/pages/Screen/models").default,
    },
];


