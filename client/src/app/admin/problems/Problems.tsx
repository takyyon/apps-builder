import React, { useEffect, useState } from 'react';
import { Page, Grid, Button, Dropdown, Card, Avatar, Text, Form } from 'tabler-react';
import ProblemsService from './Problems.service';
import Panel from '../../../utility/components/panel/Panel';
import { PanelType } from 'office-ui-fabric-react';
import { Problem } from './Problems.types';
import AddEditTag from './AddEditProblem';
import { RouteComponentProps } from '@reach/router';

interface ProblemsProps {}

const Problems: React.FC<ProblemsProps & RouteComponentProps> = props => {

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const [panelOverlay, setPanelOverlay] = useState(false);
    const [allProblems, setAllProblems] = useState<Problem[]>([]);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [selectedProblem, setSelectedProblem] = useState<Problem | undefined>(undefined);
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        const problemsResponse = await ProblemsService.getAll();
        if(problemsResponse.status === 200) {
            setProblems(problemsResponse.data);
            setAllProblems(problemsResponse.data);
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
        setSelectedProblem(undefined);
    };

    const create = async (values: Problem) => {
        setPanelOverlay(true);
        const response = await ProblemsService.create(values.name, values.description, values.icon);
        if(response.status >= 200 && response.status < 300) {
            closePanel();
            setReload(true);
        }
        setPanelOverlay(false);
    };

    const update = async (values: Problem) => {
        setPanelOverlay(true);
        if(!!values._id) {
            const response = await ProblemsService.update(values._id, values.name, values.description, values.icon);
            if(response.status >= 200 && response.status < 300) {
                closePanel();
                setReload(true);
            }
        }
        setPanelOverlay(false);
    };

    const showCategory = (index: number) => {

    };
    
    const editProblem = (index: number) => {
        setSelectedProblem(problems[index]);
        setShowPanel(true);
        setPanelType('edit');
    };

    const deleteProblem = async (index: number) => {
        const tag = problems[index];
        if(!!tag._id){
            const response = await ProblemsService.delete(tag._id);
            if(response.status >= 200 && response.status < 300) {
                setReload(true);
            }
        }
    };

    const onSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const tempTags = allProblems.filter(tag => {
            return tag.name.toLowerCase().includes(searchValue) ||
                tag.description.toLowerCase().includes(searchValue);
        });
        setProblems(tempTags);
    };

    const options = [
        (
            <div key='search-problem'>
                <Form.Input
                    placeholder='Search Problem'
                    name='search-problem'
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
                        Add Problem
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
    return (
        <>
            <Panel
                headerText={`${panelType === 'add'? 'Add': 'Edit'} problem`}
                isOpen={showPanel && panelType !== undefined}
                type={PanelType.medium}
                onDismiss={closePanel}
                overlay={panelOverlay}
            >
                <AddEditTag
                    create={create}
                    update={update}
                    cancel={closePanel}
                    problem={selectedProblem}
                />
            </Panel>
            <Page.Content
                title='Problem'
                options={options}
            >
                <Grid.Row>
                    {
                        problems.map((problem, index) => {
                            return (
                                <Grid.Col sm={6} lg={4} key={`category-${index}`}>
                                    <Card onClick={showCategory(index)}>
                                        <Card.Body>
                                            <Grid.Row className="align-items-center">
                                                <Grid.Col auto>
                                                    <Avatar
                                                    size="md"
                                                    className="d-block"
                                                    imageURL={problem.icon}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col>
                                                    <div>
                                                        {problem.name}
                                                    </div>
                                                    <Text.Small muted className="d-block item-except h-1x">
                                                        {problem.description}
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
                                                            <Dropdown.Item onClick={() => editProblem(index)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteProblem(index)}>Delete</Dropdown.Item>
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

export default Problems;