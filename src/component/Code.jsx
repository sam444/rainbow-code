import "../lib/themes/github.css";
import "../lib/js/rainbow";
import "../lib/js/language/generic";
import "../lib/js/language/javascript";
import { Component } from "rainbowui-core";
import PropTypes from 'prop-types';
import "../css/style.css";

export default class Code extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: this.props.code
		};
	}

	render() {
		return (
			<pre>
				<code id={this.componentId} data-language="javascript">
					{this.props.code?this.props.code:this.props.children}
				</code>
			</pre>
		);
	}

	componentDidUpdate() {
		if(this.props.code){
			$("#"+this.componentId).text(this.props.code);
		}
		Rainbow.color();
	}

	componentDidMount() {
		if(this.props.codeSrc){
			AjaxUtil.call(this.props.codeSrc,null,{"contentType":'application/text; charset=UTF-8'}).then((content) => {
				let contentString = JSON.stringify(content).replace(/\\r/g, "").replace(/\\n/g, "\n").replace(/\\"/g, "\"").replace(/\\t/g, "    ");
				let code = contentString.substr(1, contentString.length - 2);
				$("#"+this.componentId).text(code);
				Rainbow.color();
			});
		}
		
	}



};


/**
 * Code component prop types
 */
Code.propTypes = {
	id: PropTypes.string.isRequired,
	codeSrc: PropTypes.string.isRequired,
	code: PropTypes.string,
};

/**
 * Get code component default props
 */
Code.defaultProps = {

};
