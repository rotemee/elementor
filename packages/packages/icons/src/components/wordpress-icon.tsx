import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@elementor/ui';

const WordpressIcon = React.forwardRef( ( props: SvgIconProps, ref ) => {
	return (
		<SvgIcon viewBox="0 0 24 24" { ...props } ref={ ref }>
			<path fillRule="evenodd" clipRule="evenodd" d="M12.0004 2.01562C6.49444 2.01562 2.01562 6.49404 2.01562 11.9996C2.01562 17.5053 6.49444 21.9844 12.0004 21.9844C17.5056 21.9844 21.9844 17.5053 21.9844 11.9996C21.9844 6.49466 17.5056 2.01562 12.0004 2.01562ZM3.16156 11.9996C3.16156 10.7184 3.43668 9.5017 3.92703 8.40311L8.14311 19.9539C5.19483 18.5215 3.16156 15.4984 3.16156 11.9996ZM12.0004 20.8387C11.1327 20.8387 10.2954 20.7106 9.50324 20.4785L12.1549 12.7731L14.8725 20.2154C14.8898 20.2589 14.9115 20.2992 14.9353 20.3372C14.0167 20.6607 13.0292 20.8387 12.0004 20.8387ZM13.218 7.85596C13.7501 7.82787 14.2293 7.77149 14.2293 7.77149C14.7058 7.71531 14.65 7.01576 14.1733 7.04385C14.1733 7.04385 12.7415 7.156 11.8176 7.156C10.9495 7.156 9.4894 7.04385 9.4894 7.04385C9.0133 7.01576 8.95794 7.74402 9.43363 7.77149C9.43363 7.77149 9.88452 7.82767 10.3602 7.85596L11.7373 11.6286L9.80335 17.4297L6.58511 7.85638C7.1178 7.82829 7.59679 7.77211 7.59679 7.77211C8.07247 7.71593 8.01691 7.01596 7.53999 7.04446C7.53999 7.04446 6.10881 7.15641 5.18429 7.15641C5.01782 7.15641 4.82304 7.15207 4.61566 7.14567C6.19535 4.74588 8.9123 3.16171 12.0004 3.16171C14.3018 3.16171 16.3964 4.04157 17.9689 5.48157C17.9302 5.47971 17.8937 5.47476 17.854 5.47476C16.9861 5.47476 16.3695 6.2309 16.3695 7.04343C16.3695 7.77149 16.789 8.38801 17.2377 9.11586C17.5741 9.70512 17.9662 10.4613 17.9662 11.5537C17.9662 12.3102 17.6758 13.1882 17.2936 14.4107L16.4121 17.3566L13.218 7.85596ZM16.4435 19.6389L19.1431 11.8337C19.6481 10.573 19.8152 9.56469 19.8152 8.66789C19.8152 8.343 19.7937 8.04042 19.7557 7.75911C20.4466 9.01797 20.8391 10.4629 20.8386 11.9998C20.8386 15.2602 19.0708 18.1068 16.4435 19.6389Z" />
		</SvgIcon>
	);
} );

export default WordpressIcon;
