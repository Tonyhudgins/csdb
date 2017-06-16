import React from 'react';
import Dropzone from 'react-dropzone';

class FileDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
            <p>{this.props.label}</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default FileDropzone;
