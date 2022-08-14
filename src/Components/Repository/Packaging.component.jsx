import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { take } from "rxjs";
import { ApplicationContext, RepositoryContext } from "../../App";
import { PerforceService } from "../../Services/Perforce.service";

export const Packaging = ({}) => {
    const appState = useContext(ApplicationContext);
    const repoState = useContext(RepositoryContext);

    const { Where } = repoState;
    const [searchParams, setSearchParams] = useSearchParams();
    const [group, setGroup] = useState();
    const [contents, setContents] = useState();
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (!Where) return;

        const config = Where.path.replace('\\...\\...', '') + "/.packagingPaths.txt";
        PerforceService.PackagePaths(config).pipe(take(1)).subscribe((result) => {
            if (result.data) {
                try {
                    const parsed = JSON.parse(result.data);
                    
                } catch { }
            } 
        })
    }, [Where])

    useEffect(() => {
        console.log("OPTIONS", options);
    }, [options])
    return <div>Packaging...</div>
}