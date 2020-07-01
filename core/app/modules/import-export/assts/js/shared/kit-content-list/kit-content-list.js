import List from '../../ui/list/list';
import Grid from '../../ui/grid/grid';
import Text from '../../ui/text/text';
import Box from '../../ui/box/box';
import Checkbox from 'elementor-app/ui/atoms/checkbox';
import Button from 'elementor-app/ui/molecules/button';

import './kit-content-list.scss';

export default function KitContentList( props ) {
	const getButton = ( isProNeeded ) => {
			if ( ! isProNeeded ) {
				return;
			}

			return (
				<Grid item>
					<Button variant="cta" text={ __( 'Lear More', 'elementor' ) } url="/#" />
				</Grid>
			);
		},
		getDescriptionLink = ( isProNeeded ) => {
			if ( ! isProNeeded ) {
				return;
			}

			return (
				<Button color="cta" text={ __( 'Pro Features', 'elementor' ) } url="/#" />
			);
		};

	return (
		<List separated className="kit-content-list">
			{
				props.content.map( ( item, index ) => (
					<List.Item key={ index } className="kit-content-list__item">
						<Grid container justify="space-between" alignItems="center">
							<Grid item>
								<Grid container item>
									<Checkbox className="kit-content-list__checkbox" />

									<Grid item>
										<Text size="sm" className="kit-content-list__title">{ item.data.title }</Text>

										<Grid item>
											<Text size="sm" tag="span" className="kit-content-list__description">{ item.data.description }</Text>
											{ getDescriptionLink( item.data.notice ) }
										</Grid>
									</Grid>
								</Grid>

								{ item.data.notice ? <Box type="notice">{ item.data.notice }</Box> : null }
							</Grid>

							{ getButton( item.data.notice ) }
						</Grid>
					</List.Item>
				) )
			}
		</List>
	);
}

KitContentList.propTypes = {
	classname: PropTypes.string,
	content: PropTypes.array,
};

KitContentList.defaultProps = {
	className: '',
};
