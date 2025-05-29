import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class News extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'health'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : false,
            page: 1
        }
        document.title = this.capitalize(this.props.category);
    }

    async updateData(pageNo){

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a2d603c4deb4d8592403a2d7b574c74&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        const data = await fetch(url);  
        const parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    }

    async componentDidMount(){
        this.updateData();
    }

    handleNextButton = async () => {
        this.setState({page: this.state.page+1});
        this.updateData();
    }

    handlePreviousButton = async () => {
        this.setState({page: this.state.page-1});  
        this.updateData();
    }

    render() {
    return (
      <div>
        <div className='container mt-4'>
            <h1 className='text-center my-3'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
            <div className='text-center'>
                {this.state.loading && <Loading />}
            </div>
            <div className='row my-3'>
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className='col-md-4 mt-3' key={element.urlToImage}>
                        <NewsItem title={element.title !== null?element.title.slice(0, 40):""} description={element.description ? element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                    </div>
                })}
                
            </div>
            <div className='d-flex justify-content-between'>
                <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreviousButton} class="btn btn-dark">&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextButton} class="btn btn-dark">Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  }
}
