import { Dialog, DialogContent } from '@elementor/ui';
import Draggable from 'react-draggable';
import DialogHeader from './dialog-header';

const PromptDialog = ( props ) => {
	return (
		<Draggable handle=".MuiDialogTitle-root" cancel={ '[class*="MuiDialogContent-root"]' }>
			<Dialog
				open={ true }
				fullWidth={ true }
				hideBackdrop={ true }
				scroll="paper"
				sx={ {
					'& .MuiDialog-container': {
						alignItems: 'flex-start',
						mt: '18vh',
					},
				} }
				PaperProps={ {
					sx: {
						m: 0,
						maxHeight: '76vh',
					},
				} }
				{ ...props }
			>
				<DialogHeader onClose={ props.onClose }>
					{ props.headerAction }
				</DialogHeader>

				<DialogContent>
					{ props.children }
				</DialogContent>
			</Dialog>
		</Draggable>
	);
};

PromptDialog.propTypes = {
	headerAction: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default PromptDialog;
