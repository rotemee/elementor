import FormText from './pages/form-text';
import Connect from './pages/connect';
import FormCode from './pages/form-code';
import GetStarted from './pages/get-started';
import Loader from './components/loader';
import useUserInfo from './hooks/use-user-info';
import WizardDialog from './components/wizard-dialog';
import PromptDialog from './components/prompt-dialog';
import UpgradeChip from './components/upgrade-chip';
import MediaDialog from './media-dialog';

const PageContent = (
	{
		type,
		controlType,
		onClose,
		onConnect,
		getControlValue,
		setControlValue,
		additionalOptions,
	} ) => {
	const { isLoading, isConnected, isGetStarted, connectUrl, fetchData, hasSubscription, credits, usagePercentage } = useUserInfo();

	const promptDialogStyleProps = {
		sx: {
			'& .MuiDialog-container': {
				alignItems: 'flex-start',
				mt: 'media' === type ? '2.5vh' : '18vh',
			},
		},
		PaperProps: {
			sx: {
				m: 0,
				maxHeight: 'media' === type ? '95vh' : '76vh',
				height: ! isLoading && 'media' === type ? '95vh' : 'auto',
			},
		},
	};

	if ( isLoading ) {
		return (
			<PromptDialog onClose={ onClose } { ...promptDialogStyleProps } maxWidth={ 'media' === type ? 'lg' : 'sm' }>
				<PromptDialog.Header onClose={ onClose } />

				<PromptDialog.Content>
					<Loader />
				</PromptDialog.Content>
			</PromptDialog>
		);
	}

	if ( ! isConnected ) {
		return (
			<WizardDialog onClose={ onClose }>
				<Connect
					connectUrl={ connectUrl }
					onSuccess={ ( data ) => {
						onConnect( data );
						fetchData();
					} }
				/>
			</WizardDialog>
		);
	}

	if ( ! isGetStarted ) {
		return (
			<WizardDialog onClose={ onClose }>
				<GetStarted onSuccess={ fetchData } />
			</WizardDialog>
		);
	}

	if ( 'media' === type ) {
		return (
			<MediaDialog
				onClose={ onClose }
				getControlValue={ getControlValue }
				controlView={ controlView }
				additionalOptions={ additionalOptions }
				credits={ credits }
				hasSubscription={ hasSubscription }
				DialogProps={ promptDialogStyleProps }
			/>
		);
	}

	if ( 'code' === type ) {
		return (
			<PromptDialog onClose={ onClose } { ...promptDialogStyleProps }>
				<PromptDialog.Header onClose={ onClose }>
					{ ! hasSubscription && <UpgradeChip /> }
				</PromptDialog.Header>

				<PromptDialog.Content>
					<FormCode
						onClose={ onClose }
						getControlValue={ getControlValue }
						setControlValue={ setControlValue }
						additionalOptions={ additionalOptions }
						credits={ credits }
						usagePercentage={ usagePercentage }
					/>
				</PromptDialog.Content>
			</PromptDialog>
		);
	}

	return (
		<PromptDialog onClose={ onClose } { ...promptDialogStyleProps }>
			<PromptDialog.Header onClose={ onClose }>
				{ ! hasSubscription && <UpgradeChip /> }
			</PromptDialog.Header>

			<PromptDialog.Content>
				<FormText
					type={ type }
					controlType={ controlType }
					onClose={ onClose }
					getControlValue={ getControlValue }
					setControlValue={ setControlValue }
					additionalOptions={ additionalOptions }
					credits={ credits }
					usagePercentage={ usagePercentage }
				/>
			</PromptDialog.Content>
		</PromptDialog>
	);
};

PageContent.propTypes = {
	type: PropTypes.string,
	controlType: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	onConnect: PropTypes.func.isRequired,
	getControlValue: PropTypes.func.isRequired,
	setControlValue: PropTypes.func.isRequired,
	additionalOptions: PropTypes.object,
};

export default PageContent;
