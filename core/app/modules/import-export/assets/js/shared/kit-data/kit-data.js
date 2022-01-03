import { memo } from 'react';

import SiteArea from './components/site-area/site-area';
import Included from './components/included/included';
import DataTable from 'elementor-app/molecules/data-table';

import useKitData from './hooks/use-kit-data';

import './kit-data.scss';

function KitData( { data } ) {
	const { templates, siteSettings, content, plugins } = useKitData( data ),
		{ editElementorHomePageUrl, recentlyEditedElementorPageUrl } = data?.configData || elementorAppConfig[ 'import-export' ],
		siteSettingsUrl = editElementorHomePageUrl || recentlyEditedElementorPageUrl,
		headers = [
			__( 'Site Area', 'elementor' ),
			__( 'Included', 'elementor' ),
		],
		rowsData = [
			{
				siteArea: __( 'Elementor Templates', 'elementor' ),
				link: '/site-editor',
				included: templates,
			},
			{
				siteArea: __( 'Site Settings', 'elementor' ),
				link: siteSettingsUrl ? siteSettingsUrl + '#e:run:panel/global/open' : '',
				included: siteSettings,
			},
			{
				siteArea: __( 'Content', 'elementor' ),
				link: elementorAppConfig.admin_url + 'edit.php?post_type=page',
				included: content,
			},
			{
				siteArea: __( 'Plugins', 'elementor' ),
				link: elementorAppConfig.admin_url + 'plugins.php',
				included: plugins,
			},
		],
		rows = rowsData
			.map( ( { siteArea, included, link } ) => {
				if ( ! included.length ) {
					return;
				}

				return [
					<SiteArea key={ siteArea } text={ siteArea } link={ link } />,
					<Included key={ included } data={ included } />,
				];
			} )
			.filter( ( row ) => row );

	if ( ! rows.length ) {
		return null;
	}

	return (
		<DataTable
			className="e-app-import-export-kit-data"
			headers={ headers }
			rows={ rows }
			layout={ [ 1, 3 ] }
		/>
	);
}

KitData.propTypes = {
	data: PropTypes.object,
};

export default memo( KitData );
