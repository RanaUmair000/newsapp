import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';



const News = () => {

    

    const capitalize = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // document.title = this.capitalize(this.props.category);


    const updateData = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        props.setProgress(30);  
        const parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        this.setState({totalResults: parsedData.totalResults,});
        props.setProgress(100);
    }

    useEffect(() => {
        updateData();
    }, [])

    const handleNextButton = async () => {
        setPage(page+1);
        this.setState({page: this.state.page+1});
        this.updateData();
    }

    const handlePreviousButton = async () => {
        this.setState({page: this.state.page-1});  
        this.updateData();
    }

    const fetchData = async () => {
        const nextPage = this.state.page+1;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);  
        const parsedData = await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, page: nextPage});
    }

    return (
      <div>
        <div className='container mt-4'>
            <h1 className='text-center my-3'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
            {this.state.loading && <Loading />} 
            {!this.state.loading && (
            <InfiniteScroll
                dataLength={this.state.articles.length} 
                next={this.fetchData}
                hasMore={this.state.articles.length < this.state.totalResults}
                loader={<Loading />}
                
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
            >
                <div className='container'>
                <div className='row my-3'>
                    {this.state.articles.map((element) => {
                        return <div className='col-md-4 mt-3' key={element.url}>
                            <NewsItem title={element.title !== null?element.title.slice(0, 40):""} description={element.description ? element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                        </div>
                    })}
                    
                </div>
                </div>
            </InfiniteScroll>
            )}
        </div>
      </div>
    )
}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'health',
    totalResults: 0,
    page: 1
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}