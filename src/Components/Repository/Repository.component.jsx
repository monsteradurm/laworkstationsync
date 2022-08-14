import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PerforceService } from "../../Services/Perforce.service";
import { ScrollingPage } from "../General/ScrollingPage.component";
import { Dock } from 'primereact/dock';
import * as _ from 'underscore';

import { ApplicationContext, RepositoryContext } from "../../App";
import { RepositoryObservables } from "./Repository.context";
import { Loading } from "../General/Loading";

export const Repository = ({repoDispatch}) => {
    const appState = useContext(ApplicationContext);
    const repoState = useContext(RepositoryContext);

    
    const { Where, BusyMessage, Depot, DepotId } = repoState;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageOptions, setPageOptions] = useState(null);

    const navigation = useNavigate();
    const location = useLocation();

    const onPageChange = (page, params) => {
        const url = page + (        
            params ? '?' + 
                Object.entries(params)
                .map(p => p[0] + '=' + p[1])
                .join('&')
                : ''
            )

        navigation({
            pathname: url
        });
    }

    useEffect(() => {
        RepositoryObservables.SetDepotId(searchParams.get('name'));
    }, [searchParams]);

    useEffect(() => {
        repoDispatch({type: 'Page', value: location})
    }, [location]);
    
    useEffect(() => {
        const subs = [];
        
        subs.push(
            RepositoryObservables.BusyMessage$.subscribe((msg) => {
                repoDispatch({type: 'BusyMessage', value: msg})
            })
        );

        subs.push(
            RepositoryObservables.DepotId$.subscribe((id) => {
                repoDispatch({type: 'DepotId', value: id})
            })
        );

        subs.push(
            RepositoryObservables.Depot$.subscribe((depot) => {
                repoDispatch({type: 'Depot', value: depot})
            })
        );

        subs.push(
            RepositoryObservables.ClientId$.subscribe((id) => {
                repoDispatch({type: 'ClientId', value: id})
            })
        );

        subs.push(
            RepositoryObservables.Client$.subscribe((c) => {
                repoDispatch({type: 'Client', value: c})
            })
        );

        subs.push(
            RepositoryObservables.Where$.subscribe((w) => {
                repoDispatch({type: 'Where', value: w})
            })
        );

        subs.push(
            RepositoryObservables.IgnoreFile$.subscribe((w) => {
                repoDispatch({type: 'IgnoreFile', value: w})
            })
        );

        subs.push(
            RepositoryObservables.ConfigFile$.subscribe((w) => {
                repoDispatch({type: 'ConfigFile', value: w})
            })
        );

        return () => subs.forEach(s => s.unsubscribe());
    }, [])
    useEffect(() => {
        if (!Where && pageOptions) {
            setPageOptions(null);
        } else {
            setPageOptions([
                {
                    icon: 
                    <><i className="laws-tooltip fa fa-folder-plus"></i>
                    <div>Initialization</div>
                    </>,
                    command: (evt) => { 
                        onPageChange('Initialization', {name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-paper-plane"></i>
                    <div>Submitted</div></>,
                    command: (evt) => { 
                        onPageChange('Changes', {type: 'Submitted', name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-business-time"></i>
                    <div>Pending</div></>,
                    command: (evt) => { 
                        onPageChange('Changes', {type: 'Pending', name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-camera"></i>
                    <div>Shelved</div></>,
                    command: (evt) => { 
                        onPageChange('Changes', {type: 'Shelved', name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-book-open"></i>
                    <div>Opened</div></>,
                    command: (evt) => { 
                        onPageChange('Opened', {name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-server"></i>
                    <div>Integration</div></>,
                    command: (evt) => { 
                        onPageChange('Integration', {name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-box-open"></i>
                    <div>Packaging</div>
                    </>,
                    command: (evt) => { 
                        onPageChange('/Repositories/Packaging', {name: DepotId});
                    }
                },
                {
                    icon: <><i className="laws-tooltip fa fa-eye-slash"></i>
                    <div>Ignore</div></>,
                    command: (evt) => { 
                        onPageChange('/Repositories/Ignore', {name: Depot.name});
                    }
                },

                {
                    label: "Explore",
                    icon: <><i className="laws-tooltip fa fa-folder-open"></i>
                        <div>Explore</div>
                    </>,
                    command: (evt) => { 
                        PerforceService.ExplorePath(Where.path.replace('\\...\\...', ''))
                    }
                },

            ]);
        }
    }, [Where])
    
    return (
    <>
    {
        pageOptions?.length > 0 && DepotId?
        <>
            <Dock model={pageOptions} position="right" magnification={false}/> 
        </>: null
    }
        <ScrollingPage>
            { BusyMessage ? <Loading text={BusyMessage} /> : null }
            <div style={{display: BusyMessage ? 'hidden' : null}}>
                <Outlet />
            </div>
        </ScrollingPage>
    </>)
}