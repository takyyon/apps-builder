import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import PlatformsService from './Platforms.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { Platform } from './Platforms.types';
import AddEditPlatform from './AddEditPlatform';
import { RouteComponentProps } from '@reach/router';

interface PlatformsProps {}

const Platforms: React.FC<PlatformsProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allPlatforms, setAllPlatforms] = useState<Platform[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>(undefined);
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        const platformsResponse = await PlatformsService.getAll();
        if(platformsResponse.status === 200) {
            setPlatforms(platformsResponse.data);
            setAllPlatforms(platformsResponse.data);
        }
        setReload(false);
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
        setSelectedPlatform(undefined);
    };

    const create = async (values: Platform) => {
        setPanelOverlay(true);
        const response = await PlatformsService.create(values.name, values.description, values.icon);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: Platform) => {
        setPanelOverlay(true);
        if(!!values._id) {
            const response = await PlatformsService.update(values._id, values.name, values.description, values.icon);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editPlatform = (index: number) => {
        setSelectedPlatform(platforms[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deletePlatform = async (index: number) => {
        const platform = platforms[index];
        if(!!platform._id){
            const response = await PlatformsService.delete(platform._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempPlatforms = allPlatforms.filter(platform => {
            return platform.name.toLowerCase().includes(searchValue) ||
            platform.description.toLowerCase().includes(searchValue);
        });
        setPlatforms(tempPlatforms);
    };

    const options = [
        (
            <div key='search-platform'>
                <Form.Input
                    placeholder='Search Platform'
                    name='search-platform'
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
                        Add Platform
                    </Dropdown.Item>
                    <Dropdown.Item>Delete Selected</Dropdown.Item>
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
    return (
        <>
            <Panel
                headerText={`${panelType === 'add'? 'Add': 'Edit'} platform`}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                <AddEditPlatform
                    create={create}
                    update={update}
                    cancel={closePanel}
                    platform={selectedPlatform}
                />
            </Panel>
            <Page.Content
                title='Platforms'
                options={options}
            >
                <Grid.Row>
                    {
                        platforms.map((platform, index) => {
                            return (
                                <Grid.Col sm={6} lg={3} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={platform.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {platform.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {platform.description}
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
                                                            <Dropdown.Item onClick={() => editPlatform(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deletePlatform(index)}>Delete</Dropdown.Item>
                                                        </React.Fragment>
                                                    }
                                                    />
                                                </Grid.Col>
                                            </Grid.Row>
                                        </Card.Body>
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

export default Platforms;