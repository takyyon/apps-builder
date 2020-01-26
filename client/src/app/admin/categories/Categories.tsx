import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import CategoriesService from './Categories.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { Category } from './Categories.types';
import AddEditCategory from './AddEditCategory';
import { RouteComponentProps } from '@reach/router';

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        const categoriesResponse = await CategoriesService.getAll();
        if(categoriesResponse.status === 200) {
            setCategories(categoriesResponse.data);
            setAllCategories(categoriesResponse.data);
        }
        setReload(false);
    };

    const reloadData = async() => {
        fetchData();
    };

    const showAddPanel = () => {
        setShowPanel(true);
        setPanelType('add');
    };

    const closePanel = () => {
        setShowPanel(false);
        setPanelType(undefined);
        setPanelOverlay(false);
        setSelectedCategory(undefined);
    };

    const create = async (values: Category) => {
        setPanelOverlay(true);
        const response = await CategoriesService.create(values.name, values.description, values.icon);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: Category) => {
        setPanelOverlay(true);
        if(!!values._id) {
            const response = await CategoriesService.update(values._id, values.name, values.description, values.icon);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editCategory = (index: number) => {
        setSelectedCategory(categories[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deleteCategory = async (index: number) => {
        const category = categories[index];
        if(!!category._id){
            const response = await CategoriesService.delete(category._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempCategories = allCategories.filter(category => {
            return category.name.toLowerCase().includes(searchValue) ||
                category.description.toLowerCase().includes(searchValue);
        });
        setCategories(tempCategories);
    };

    const options = [
        (
            <div key='search-category'>
                <Form.Input
                    placeholder='Search Category'
                    name='search-category'
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
                        Add Category
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
                headerText={`${panelType === 'add'? 'Add': 'Edit'} category`}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                <AddEditCategory
                    create={create}
                    update={update}
                    cancel={closePanel}
                    category={selectedCategory}
                />
            </Panel>
            <Page.Content
                title='Categories'
                options={options}
            >
                <Grid.Row>
                    {
                        categories.map((category, index) => {
                            return (
                                <Grid.Col sm={6} lg={3} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={category.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {category.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {category.description}
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
                                                            <Dropdown.Item onClick={() => editCategory(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteCategory(index)}>Delete</Dropdown.Item>
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

export default Categories;