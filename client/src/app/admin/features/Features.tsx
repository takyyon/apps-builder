import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import FeaturesService from './Features.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { Feature } from './Features.types';
import AddEditFeature from './AddEditFeature';
import { RouteComponentProps } from '@reach/router';
import LoadingComponent from '../../../utility/components/LoadingComponent';
import AppsService from '../apps/Apps.service';
import { App } from '../apps/Apps.types';
import { Tag } from '../tags/Tags.types';
import { Platform } from '../platforms/Platforms.types';
import { Category } from '../categories/Categories.types';
import TagsService from '../tags/Tags.service';
import PlatformsService from '../platforms/Platforms.service';
import CategoriesService from '../categories/Categories.service';
import AssignFeature from './AssignFeature';
import { upperFirst } from 'lodash-es';

interface FeaturesProps {}

const Features: React.FC<FeaturesProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>(undefined);
    const [reload, setReload] = useState(false);
    const [initiaLoading, setInitialLoading] = useState(true);
    const [apps, setApps] = useState<App[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchData = async () => {
        const [featuresResponse, appsResponse, tagsResponse, platformsResponse, categoriesResponse] = await Promise.all([
                FeaturesService.getAll(),
                AppsService.getAll(),
                TagsService.getAll(),
                PlatformsService.getAll(),
                CategoriesService.getAll(),
            ]);
        if(featuresResponse.status === 200) {
            setFeatures(featuresResponse.data);
            setAllFeatures(featuresResponse.data);
        }
        if(appsResponse.status === 200) {
            setApps(appsResponse.data);
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
        setSelectedFeature(undefined);
    };

    const create = async (values: Feature) => {
        setPanelOverlay(true);
        const appId = !!values.app && !!values.app._id ? values.app._id: undefined;
        const response = await FeaturesService.create(values.name, values.description, values.icon, values.images, appId);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: Feature) => {
        setPanelOverlay(true);
        const appId = !!values.app && !!values.app._id ? values.app._id: undefined;
        if(!!values._id) {
            const response = await FeaturesService.update(values._id, values.name, values.description, values.icon, values.images, appId);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editFeature = (index: number) => {
        setSelectedFeature(features[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deleteFeature = async (index: number) => {
        const feature = features[index];
        if(!!feature._id){
            const response = await FeaturesService.delete(feature._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchByAppChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempFeatures = allFeatures.filter(feature => {
            return !searchValue || (
                !!feature.app && feature.app.name.toLowerCase().includes(searchValue)
            );
        });
        setFeatures(tempFeatures);
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempFeatures = allFeatures.filter(feature => {
            return !searchValue || (
                feature.name.toLowerCase().includes(searchValue) ||
                feature.description.toLowerCase().includes(searchValue));
        });
        setFeatures(tempFeatures);
    };

    const assignToFeature = (index: number) => {
        setSelectedFeature(features[index]);
        setShowPanel(true);
        setPanelType('assign');
    };

    const assign = async (id: string, newTags: string[], newCategories: string[], newPlatforms: string[]) => {
        setPanelOverlay(true);
        const response = await FeaturesService.assign(id, newTags, newCategories, newPlatforms);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const options = [
        (
            <div key='search-feature-by-app'>
                <Form.Input
                    placeholder='Search feature by app'
                    name='search-feature-by-app'
                    onChange={onSearchByAppChange}
                />
            </div>
        ),
        (
            <div key='search-feature'>
                <Form.Input
                    placeholder='Search feature'
                    name='search-feature'
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
                        Add feature
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
                headerText={upperFirst(`${panelType} feature`)}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                {
                    (panelType === 'add' || panelType === 'edit') && (
                        <AddEditFeature
                            create={create}
                            update={update}
                            cancel={closePanel}
                            feature={selectedFeature}
                            apps={apps}
                        />
                )}
                {
                    panelType === 'assign' && !!selectedFeature && (
                        <AssignFeature
                            assign={assign}
                            cancel={closePanel}
                            feature={selectedFeature}
                            categories={categories}
                            tags={tags}
                            platforms={platforms}
                        />
                    )
                }
            </Panel>
            <Page.Content
                title='Features'
                options={options}
            >
                <Grid.Row>
                    {
                        features.map((feature, index) => {
                            return (
                                <Grid.Col sm={6} lg={4} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        {
                                            !!feature.app && (
                                                <Card.Header>
                                                    <Grid.Row className="align-items-center">
                                                        <Avatar
                                                            size="md"
                                                            className="d-block"
                                                            imageURL={feature.app.icon}
                                                            />
                                                        <Grid.Col>
                                                            {feature.app.name}
                                                        </Grid.Col>
                                                    </Grid.Row>
                                                </Card.Header>
                                            )
                                        }
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={feature.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {feature.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {feature.description}
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
                                                            <Dropdown.Item onClick={() => editFeature(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => assignToFeature(index)}>Assign</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteFeature(index)}>Delete</Dropdown.Item>
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </Grid.Col>
                                            </Grid.Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Grid.Row className="align-items-center">
                                                {feature.images.map((image, index) => {
                                                    return (
                                                        <Avatar
                                                            size="md"
                                                            name={`feature-image-${index}`}
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

export default Features;