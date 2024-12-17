import React from "react";

export default class Result extends React.Component {
  clearList = () => {
    this.props.onChange();
  };

  render() {
    return (
      <div>
        <button
          id="clearListButton"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="btn btn-outline-secondary"
          onClick={this.clearList}
        >
          Clear the list
        </button>
        {this.props.winners.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Winner
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.winners.map((winner, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      border: "1px solid #ddd",
                    }}
                  >
                    {winner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No winners yet.</p>
        )}
      </div>
    );
  }
}
