import React from "react";

import PropTypes from "prop-types";

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.props.items.length === 0 || this.props.spinning === true) {
      console.log("Can't spin an empty wheel or a spinning wheel");
      return;
    }
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      this.props.onChange(selectedItem);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    // Color palette for multiple segment colors
    const colorPalette = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#A133FF",
      "#33FFF3",
      "#FFC133",
      "#F3FF33",
    ];

    // Map each segment to a color based on its index
    const segmentColors = items.map(
      (_, index) => colorPalette[index % colorPalette.length]
    );

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };

    const spinning = selectedItem !== null ? "spinning" : "";
    let spinDuration = localStorage.getItem("duration") || 10;

    const cssProperties = {
      "--spinning-duration": `${spinDuration}s`,
      "--wheel-color": this.props.wheelColor || "#d38c12",
      "--neutral-color": this.props.fontColor || "#FFFFFF",
    };

    return (
      <div style={cssProperties}>
        <h1 className="text-center">Click to Spin</h1>
        <div className="wheel-container">
          <div
            lg={true}
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{
                  "--item-nb": index,
                  backgroundColor: segmentColors[index],
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Define prop types
Wheel.propTypes = {
  items: PropTypes.array.isRequired,
  wheelColor: PropTypes.string,
  fontColor: PropTypes.string,
  onChange: PropTypes.func,
  onSelectItem: PropTypes.func,
  spinning: PropTypes.bool,
};

// Define default prop values
Wheel.defaultProps = {
  items: ["1", "2", "3", "4", "5", "6", "7", "8"],
  wheelColor: "#d38c12",
  fontColor: "#000000",
  spinning: false,
};
