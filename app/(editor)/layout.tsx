import MechanicsNav from "./_components/mechanicsNavigation";

const RootLayout = ({children} :  {children: React.ReactNode}) =>  {
    return ( 
        <div className="h-full flex">
            <MechanicsNav />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
     );
}
 
export default RootLayout;