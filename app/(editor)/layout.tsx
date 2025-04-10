import MechanicsNav from "./_components/mechanicsNavigation";

import { supabase } from '@/app/utils/supabase';

const RootLayout = async ({children} :  {children: React.ReactNode}) =>  {
    
    let { data: GameMechanic, error } = await supabase
    .from('GameMechanic')
    .select('*');
        
    
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