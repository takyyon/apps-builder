import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import TagsService from './Tags.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { Tag } from './Tags.types';
import AddEditTag from './AddEditTag';
import { RouteComponentProps } from '@reach/router';

interface TagsProps {}

const Tags: React.FC<TagsProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        const tagsResponse = await TagsService.getAll();
        if(tagsResponse.status === 200) {
            setTags(tagsResponse.data);
            setAllTags(tagsResponse.data);
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
        setSelectedTag(undefined);
    };

    const create = async (values: Tag) => {
        setPanelOverlay(true);
        const response = await TagsService.create(values.name, values.description, values.icon);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: Tag) => {
        setPanelOverlay(true);
        if(!!values._id) {
            const response = await TagsService.update(values._id, values.name, values.description, values.icon);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editTag = (index: number) => {
        setSelectedTag(tags[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deleteTag = async (index: number) => {
        const tag = tags[index];
        if(!!tag._id){
            const response = await TagsService.delete(tag._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempTags = allTags.filter(tag => {
            return tag.name.toLowerCase().includes(searchValue) ||
                tag.description.toLowerCase().includes(searchValue);
        });
        setTags(tempTags);
    };

    const options = [
        (
            <div key='search-tag'>
                <Form.Input
                    placeholder='Search Tag'
                    name='search-tag'
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
                        Add Tag
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
                headerText={`${panelType === 'add'? 'Add': 'Edit'} tag`}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                <AddEditTag
                    create={create}
                    update={update}
                    cancel={closePanel}
                    tag={selectedTag}
                />
            </Panel>
            <Page.Content
                title='Tags'
                options={options}
            >
                <Grid.Row>
                    {
                        tags.map((tag, index) => {
                            return (
                                <Grid.Col sm={6} lg={3} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={tag.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {tag.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {tag.description}
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
                                                            <Dropdown.Item onClick={() => editTag(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteTag(index)}>Delete</Dropdown.Item>
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

export default Tags;