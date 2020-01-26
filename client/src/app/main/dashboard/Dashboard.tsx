import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Swiper from 'react-id-swiper';
import LoadingComponent from '../../../utility/components/LoadingComponent';
import AppService from '../../../services/App.service';
import FeatureService from '../../../services/Feature.service';
import { App } from '../../admin/apps/Apps.types';
import { Card, Text, Grid, Avatar, Button, Badge } from 'tabler-react';
import { Feature } from '../../admin/features/Features.types';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps & RouteComponentProps> = props => {
    

    const [initiaLoading, setInitialLoading] = useState(true);
    const [apps, setApps] = useState<App[]>([]);
    const [features, setFeatures] = useState<Feature[]>([]);

    const getParams = () => {
        const appLength = Math.floor(apps.length/2);
        const params = {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: '5',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            },
            pagination: {
              el: '.swiper-pagination'
            }
        };
        if(appLength > 0) {
            params['activeSlideKey'] = `app-${appLength}`;
        }
        return params;
    };

    const fetchData = async() => {
        setInitialLoading(true);
        const [appResponse, featureResponse] = await Promise.all([AppService.getAll(), FeatureService.getAll()]);
        if(appResponse.status === 200) {
            setApps(appResponse.data);
        }
        if(featureResponse.status === 200) {
            setFeatures(featureResponse.data);
        }
        setInitialLoading(false);
    };

    const getAppFeatures = (appId: string) => {
        return features.filter(feature => !!feature.app && feature.app._id === appId);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(initiaLoading) {
        return <LoadingComponent />;
    }

    return (
        <>
            <Swiper {...getParams()}>
                {apps.map((app, index) => {
                    const appFeatures = !!app._id ? getAppFeatures(app._id): [];
                    const selectedAppFeatures: Feature[] = [];
                    let totalCost = 0;
                    let selectedCost = 0;
                    appFeatures.forEach((feature) => {
                        totalCost += feature.cost;
                        if(feature.selected) {
                            selectedCost += feature.cost;
                            selectedAppFeatures.push(feature);
                        }
                    });
                    return (
                        <div key={`app-${index}`}>
                            <Card>
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
                                            <div className='font-weight-bold'>
                                                {app.name}
                                            </div>
                                            <Text.Small>
                                                {app.description}
                                            </Text.Small>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Grid.Row>
                                        <Grid.Col>
                                            <div>
                                                <Badge color="warning" className="mr-1 px-1">
                                                    {`${selectedAppFeatures.length} feature${selectedAppFeatures.length > 1? 's':''}`}
                                                </Badge>
                                            </div>
                                            <Text.Small className='font-weight-bold'>
                                                {`$${selectedCost} ${selectedCost === totalCost ? '': ` - $${totalCost}`}`}
                                            </Text.Small>
                                        </Grid.Col>
                                        <Grid.Col>
                                            <Button pill color="gray">
                                                Build App
                                            </Button>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Card.Footer>
                            </Card>
                        </div>
                    )
                })}
            </Swiper>
        </>
    );
};

export default Dashboard;