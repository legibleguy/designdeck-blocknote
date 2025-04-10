import MechanicsNav from "./_components/mechanicsNavigation";
import { ProjectTagsProvider } from "./context/projectTagsContext";

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
        <ProjectTagsProvider>
            <div className="h-full flex w-full">
                <MechanicsNav gameMechanics={gameMechanics} />
                <main className="flex-1 h-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </ProjectTagsProvider>
     );
}
 
export default RootLayout;