import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import AppsService from './Apps.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { App } from './Apps.types';
import AddEditApp from './AddEditApp';
import { RouteComponentProps } from '@reach/router';
import LoadingComponent from './../../../utility/components/LoadingComponent';
import TagsService from '../tags/Tags.service';
import PlatformsService from '../platforms/Platforms.service';
import CategoriesService from '../categories/Categories.service';
import ProblemsService from '../problems/Problems.service';
import { Tag } from '../tags/Tags.types';
import { Platform } from '../platforms/Platforms.types';
import { Category } from '../categories/Categories.types';
import { Problem } from '../problems/Problems.types';
import {upperFirst} from 'lodash-es';
import AssignApp from './AssignApp';

interface AppsProps {}

const Apps: React.FC<AppsProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allApps, setAllApps] = useState<App[]>([]);
    const [apps, setApps] = useState<App[]>([]);
    const [selectedApp, setSelectedApp] = useState<App | undefined>(undefined);
    const [reload, setReload] = useState(false);
    const [initiaLoading, setInitialLoading] = useState(true);
    const [tags, setTags] = useState<Tag[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [problems, setProblems] = useState<Problem[]>([]);

    const fetchData = async () => {
        const [appsResponse, tagsResponse, platformsResponse, categoriesResponse, problemsResponse] = await Promise.all([
                AppsService.getAll(),
                TagsService.getAll(),
                PlatformsService.getAll(),
                CategoriesService.getAll(),
                ProblemsService.getAll(),
            ]);
        if(appsResponse.status === 200) {
            setApps(appsResponse.data);
            setAllApps(appsResponse.data);
        }
        if(tagsResponse.status === 200) {
            setTags(tagsResponse.data);
        }
        if(platformsResponse.status === 200) {
            setPlatforms(platformsResponse.data);
        }
        if(categoriesResponse.status === 200) {
            setCategories(categoriesResponse.data);
        }
        if(problemsResponse.status === 200) {
            setProblems(problemsResponse.data);
        }
        setReload(false);
        setInitialLoading(false);
    };

    const reloadData = async() => {
        fetchData();
        setReload(false);
    };

    const showAddPanel = () => {
        setShowPanel(true);
        setPanelType('add');
    };

    const closePanel = () => {
        setShowPanel(false);
        setPanelType(undefined);
        setPanelOverlay(false);
        setSelectedApp(undefined);
    };

    const create = async (values: App) => {
        setPanelOverlay(true);
        const response = await AppsService.create(values.name, values.description, values.icon, values.images);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: App) => {
        setPanelOverlay(true);
        if(!!values._id) {
            const response = await AppsService.update(values._id, values.name, values.description, values.icon, values.images);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editApp = (index: number) => {
        setSelectedApp(apps[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deleteApp = async (index: number) => {
        const app = apps[index];
        if(!!app._id){
            const response = await AppsService.delete(app._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempTags = allApps.filter(app => {
            return app.name.toLowerCase().includes(searchValue) ||
                app.description.toLowerCase().includes(searchValue);
        });
        setApps(tempTags);
    };

    const assignToApp = (index: number) => {
        setSelectedApp(apps[index]);
        setShowPanel(true);
        setPanelType('assign');

    };

    const assign = async (id: string, newTags: string[], newCategories: string[], newPlatforms: string[], newProblems: string[]) => {
        setPanelOverlay(true);
        const response = await AppsService.assign(id, newTags, newCategories, newPlatforms, newProblems);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const options = [
        (
            <div key='search-app'>
                <Form.Input
                    placeholder='Search App'
                    name='search-app'
                    onChange={onSearchChange}
                />
            </div>
        ),
        (
            <div key='button-list'>
                <Button.Dropdown
                    icon='activity'
                    color='secondary'
                >
                    <Dropdown.Item onClick={showAddPanel}>
                        Add App
                    </Dropdown.Item>
                </Button.Dropdown>
            </div>
        ),
    ];
    
    
    useEffect(() => {
        if(reload) {
            reloadData();
        }
    }, [reload]);
    useEffect(() => {
        fetchData();
    }, []);

    if(initiaLoading){
        return <LoadingComponent />;
    }

    return (
        <>
            {reload && (<LoadingComponent />)}
            <Panel
                headerText={upperFirst(`${panelType} app`)}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                {
                    (panelType === 'add' || panelType === 'edit') && (
                        <AddEditApp
                            create={create}
                            update={update}
                            cancel={closePanel}
                            app={selectedApp}
                        />
                )}   
                {
                    panelType === 'assign' && !!selectedApp && (
                        <AssignApp
                            assign={assign}
                            cancel={closePanel}
                            app={selectedApp}
                            categories={categories}
                            tags={tags}
                            platforms={platforms}
                            problems={problems}
                        />
                    )
                }
            </Panel>
            <Page.Content
                title='Apps'
                options={options}
            >
                <Grid.Row>
                    {
                        apps.map((app, index) => {
                            return (
                                <Grid.Col sm={6} lg={4} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={app.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {app.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {app.description}
                                                    </Text.Small>
                                                </Grid.Col>
                                                <Grid.Col auto>
                                                    <Dropdown
                                                    trigger={
                                                        <Dropdown.Trigger
                                                        icon="more-vertical"
                                                        toggle={false}
                                                        />
                                                    }
                                                    position="right"
                                                    items={
                                                        <React.Fragment>
                                                            <Dropdown.Item onClick={() => editApp(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => assignToApp(index)}>Assign</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteApp(index)}>Delete</Dropdown.Item>
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </Grid.Col>
                                            </Grid.Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Grid.Row className="align-items-center">
                                                {app.images.map((image, index) => {
                                                    return (
                                                        <Avatar
                                                            key={`app-image-${index}`}
                                                            size="md"
                                                            name={`app-image-${index}`}
                                                            className="d-block"
                                                            imageURL={image}
                                                        />
                                                    );
                                                })}
                                            </Grid.Row>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Col>
                            );
                        })
                    }
                </Grid.Row>
            </Page.Content>
        </>
    );
};

export default Apps;