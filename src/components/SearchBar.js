import React, { Component } from 'react';
import ImageResults from './ImageResults.js';
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class SearchBar extends Component {

  state = {
    searchText: "",
    imageNumber: 24,
    images: []
  }

  componentDidMount = () => {
    this.api = "https://pixabay.com/api/";
    this.apiKey = "9804763-49a788f52a5c04ae399a9ce6e";
  }

  onTextChange = (e) => {
    const value = e.target.value;
    this.setState({ [e.target.name]: value },
      () => {
        if(value === "") {
          this.setState({ images: [] });
        } else {
          fetch(`${this.api}?key=${this.apiKey}
            &q=${this.state.searchText}
            &image_type=photo&per_page=${this.state.imageNumber}&safesearch=true`)
            .then(res => res.json())
            .then(data => this.setState({ images: data.hits }))
            .catch(err => console.log(err));
        }
      });
  }

  onImageNumberChange = (e, index, value) => {
    this.setState({ imageNumber: value });
  }

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullWidth={true}
        />
        <SelectField
          name="imageNumber"
          floatingLabelText="Image Number"
          value={this.state.imageNumber}
          onChange={this.onImageNumberChange}
        >
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={12} primaryText="12" />
          <MenuItem value={24} primaryText="24" />
          <MenuItem value={51} primaryText="51" />
        </SelectField>
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
      </div>
    );
  }
}

export default SearchBar;