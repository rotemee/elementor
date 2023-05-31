import { MenuItem, Select, FormControl, InputLabel } from '@elementor/ui';

const labelToDashCash = ( str ) => str.toLowerCase().replace( / /g, '-' );

const PromptActionSelection = ( props ) => {
	const actionId = labelToDashCash( props.label );

	return (
		<FormControl sx={ { width: 138 } }>
			<InputLabel id={ actionId }>{ props.label }</InputLabel>

			<Select
				labelId={ actionId }
				id={ actionId }
				value=""
				color="secondary"
				onChange={ props.onChange }
				size="small"
				label={ props.label }
				disabled={ props.disabled }
				MenuProps={ {
					PaperProps: {
						sx: {
							width: 138,
						},
					},
				} }
				sx={ {
					// Fixing global CSS of the editor that targets input[disabled] globally.
					'&.Mui-disabled .MuiSelect-nativeInput': {
						backgroundColor: 'initial',
						opacity: 0,
					},
				} }
			>
				{ props.options.map( ( option ) => (
					<MenuItem
						dense
						key={ option.label }
						value={ option.label }
					>
						{ option.label }
					</MenuItem>
				) ) }
			</Select>
		</FormControl>
	);
};

PromptActionSelection.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
	} ) ).isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
	wrapperStyle: PropTypes.object,
	disabled: PropTypes.bool,
};

export default PromptActionSelection;
