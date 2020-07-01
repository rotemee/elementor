import Layout from '../../templates/layout';
import Message from '../../ui/message/message';
import Heading from '../../ui/heading/heading';
import ImportSuccessList from './import-success-list/import-success-list';
import Grid from '../../ui/grid/grid';
import Button from 'elementor-app/ui/molecules/button';

export default function ImportSuccess() {
	return (
		<Layout type="import">
			<Message className="e-app-import-success">
				<Heading size="lg">
					{ __( 'Congrats, the following kit elements were imported', 'elementor' ) }
				</Heading>

				<ImportSuccessList />

				<Grid container justify="center">
					<Button variant="primary" text={ __( 'View live Site', 'elementor' ) } url="/#"/>
				</Grid>
			</Message>
		</Layout>
	);
}
