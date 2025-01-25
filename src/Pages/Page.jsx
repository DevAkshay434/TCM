import React, { lazy, Suspense, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { GET_PAGE } from '../Queries/Queries';
const Carousel = lazy(() => import('../Component/Carousel'));
const Map = lazy(() => import('../Component/Map'));
const Support = lazy(() => import('../Layout/HomePage/Support'));
const Banner = lazy(() => import('../Layout/HomePage/Banner'));
const Container = lazy(() => import('../Layout/HomePage/Container'));
const AboutCard = lazy(() => import('../Layout/About/AboutCards'));
const Form = lazy(() => import('../Layout/Contact Form/Form'));
const ShopProduct = lazy(() => import('../Layout/Woocommerce/Product/Products/ShopProduct')); 
const Loader = lazy(() => import('../libs/Loader'));
const Privacy = lazy(() => import('../Layout/Privacy Policy/Privacy'));
const ListItems = lazy(() => import('../Component/ListItems'));
const Accordion = lazy(() => import('../Component/Accordion'));
const Product = lazy(() => import('../Layout/Woocommerce/Product/ProductCard/Product'));
const Login = lazy(() => import('../Layout/Login/Login'));
const Registration = lazy(() => import('../Layout/Login/Register'));
const Cards = lazy(() => import('../Layout/HomePage/Cards'));
const ProductCar = lazy(() => import('../Layout/Woocommerce/Product/ProductCarousel/ProductCar'));
const NotFound = lazy(()=> import('../libs/NotFound'))
const Categorycarousel = lazy(() => import('../Layout/Woocommerce/Category/circle/Categorycarousel'));
Categorycarousel.preload = () => import('../Layout/Woocommerce/Category/circle/Categorycarousel');
Product.preload = () => import('../Layout/Woocommerce/Product/ProductCard/Product');
const Page =() => {
    const { uri } = useParams();
    // Memoize URI string
    const uriString = useMemo(() => (!uri || uri === 'home' ? '/' : String(uri)), [uri]);

    // Fetch page data using GraphQL query
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { uri: uriString },
        fetchPolicy:'cache-first',
        nextFetchPolicy:'cache-and-network' 
    });

    // Prefetch other important pages when homepage is loaded
    useEffect(() => {
    
        if (uriString === '/' && data && !loading ) {
            import('../Layout/About/AboutCards'); // Prefetch About Cards
            import('../Layout/Contact Form/Form'); 
            import('../Layout/HomePage/Banner');
            Categorycarousel.preload();
            Product.preload();
        }
    }, [uriString, data, loading]);

    // Render loader only for the homepage on the first visit
    // Memoize rendering logic to avoid re-computing on each render
    const renderBuilderComponents = useCallback((builder) => {
        return builder.map((pages, index) => {
            switch (pages.fieldGroupName) {
                case 'PageBuilderPagesBannerLayout':
                    return <Carousel key={index} pages={pages} />;
                case 'PageBuilderPagesContainerLayout':
                    switch (pages.layout) {
                        case 'Text':
                            return <Privacy key={index} pages={pages} />;
                        case 'Columns Background Images':
                            return <Container key={index} pages={pages} />;
                        case 'rightimage':
                            return <Banner key={index} pages={pages} />;
                        case 'Leftimage':
                            return <Support key={index} pages={pages} />;

                        default:
                            return null;
                    }
                case 'PageBuilderPagesContactFormLayout':
                    return <Form key={index} pages={pages} />;
                case 'PageBuilderPagesCategoriesLayout':
                    switch (pages.layout) {
                        case 'Carousel':
                            return <Categorycarousel key={index} pages={pages} />;
                        // case 'Card With Icon':
                        //     return <Box key={index} pages={pages} />;
                        case 'Bg Image':
                            return <Cards key={index} pages={pages} />;
                        default:
                            return null;
                    }
                case 'PageBuilderPagesListItemsLayout':
                    switch (pages.layoutOfPage) {
                        case 'FAQ':
                            return <Accordion key={index} pages={pages} />;
                        case 'List':
                            return <ListItems key={index} pages={pages} />;
                        default:
                            return null;
                    }
                case 'PageBuilderPagesProductLayout':
                    switch (pages.productSection) {
                        case 'Cards':
                            return <Product key={index} pages={pages} />;
                        case 'Carousel':
                            return <ProductCar key={index} pages={pages} />;
                        case 'Filter':
                            return <ShopProduct key={index} pages={pages} />;
                        default:
                            return null;
                    }
                case 'PageBuilderPagesFormLayout':
                    switch (pages.formLayout) {
                        case 'Sign in':
                            return <Login key={index} pages={pages} />;
                        case 'Sign up':
                            return <Registration key={index} pages={pages} />;
                        default:
                            return null;
                    }
                case 'PageBuilderPagesCardsLayout':
                    return <AboutCard key={index} pages={pages} />;
                case 'PageBuilderPagesMapLayout':
                    return <Map key={index} pages={pages} />
                default:
                    return null;
            }
        });
    }, []);


    // Render loader during loading or fallback error handling
    if (loading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;
    if (!data?.pageBy) return <NotFound />;

    // Lazy load components with Suspense
    return (
        <Suspense fallback={<Loader/> }>
            <main>
                {renderBuilderComponents(data.pageBy.pageBuilder.pages || [])}
            </main>
        </Suspense>
    );

}


export default Page;
