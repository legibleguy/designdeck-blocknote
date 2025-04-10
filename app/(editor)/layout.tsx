import MechanicsNav from "./_components/mechanicsNavigation";

import { supabase } from '@/app/utils/supabase';

const RootLayout = async ({children} :  {children: React.ReactNode}) =>  {
    let { data: gameMechanics, error } = await supabase
    .from('GameMechanic')
    .select('*');

    gameMechanics = gameMechanics ?? [];

    if (error) {
        console.error("Error fetching game mechanics:", error);
        gameMechanics = [];
    }

    return ( 
        <div className="h-full flex">
            <MechanicsNav gameMechanics={gameMechanics} />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
     );
}
 
export default RootLayout;