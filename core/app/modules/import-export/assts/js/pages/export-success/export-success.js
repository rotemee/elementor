import Layout from '../../templates/layout';
import Message from '../../ui/message/message';
import Heading from '../../ui/heading/heading';
import Text from '../../ui/text/text';

export default function ExportSuccess() {
	return (
		<Layout type="export">
			<Message className="e-app-export-success">
				<Heading size="xl">
					{ __( 'Your Kit Was Exported Successfully!', 'elementor' ) }
				</Heading>
				<Text size="md">
					{ __( 'Use this exported Kit on another Elementor site by uploading it via Kit Manager > Import Kit', 'elementor' ) }
				</Text>
				<Text size="sm">
					{ __( 'If the download doesn\'t start automatically, please  click here', 'elementor' ) }
				</Text>
			</Message>
		</Layout>
	);
}

