export interface RouterLinkInterface {
    name: string;
    path: string;
    title: string;
}

export const routeLinks:RouterLinkInterface[]=[
    { path:'/', name:'home', title:'Inicio' },
    { path:'/about', name:'about', title:'Sobre' },
    { path:'/characters', name:'characters', title:'Personajess' }
];