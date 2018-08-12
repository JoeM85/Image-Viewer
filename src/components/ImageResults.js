import React, { Component } from 'react';
import Proptypes from "prop-types";
import GridList from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import GridTile from 'material-ui/GridList/GridTile';

class ImageResults extends Component {

  state = {
    open: false,
    currenImg: ""
  }

  static protoTypes = {
    images: Proptypes.array.isRequired
  }

  handleOpen = img => {
    this.setState({
      open: true,
      currenImg: img
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  render() {

    let imageListContent;
    const images = this.props.images;

    if(images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => {
            return <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt={img.tags} />
            </GridTile>;
          })}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          model={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <img
            src={this.state.currenImg}
            alt="Preview"
            style={{ width: "100%" }}
          />
        </Dialog>
      </div>
    );
  }
}

export default ImageResults;