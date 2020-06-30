import { Context as ImportContext } from '../../../context/import';
import KitContentList from '../../../shared/kit-content-list/kit-content-list';

export default function ImportContentList() {
	const { importContent } = React.useContext( ImportContext );

	return <KitContentList content={ importContent } />;
}

ImportContentList.propTypes = {
	classname: PropTypes.string,
	content: PropTypes.array,
};

ImportContentList.defaultProps = {
	className: '',
};

