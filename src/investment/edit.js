/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';

import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as BlockEditorStore,
} from '@wordpress/block-editor';

function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeIU,
	isSelected
}) {
	const { url, id, alt, title, business, sector, years, type, category } = attributes;
	const titleRef = useRef();
	const previousURL = usePrevious(url);
	const [blobURL, setBlobURL] = useState();
	const previousIsSelected = usePrevious(isSelected); 

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select('core');
			return id ? getMedia(id) : null;
		},
		[id]
	);
	const imageSizes = useSelect((select) => {
		return select(BlockEditorStore).getSettings().imageSizes;
	}, []);
	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};
	const onChangeImageSize = (newURL) => {
		setAttributes({ url: newURL });
	};
	const onChangeAltText = (newAltText) => {
		setAttributes({ alt: newAltText });
	};
	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: '' });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};
	const onSelectImageURL = (newUrl) => {
		setAttributes({ url: newUrl, id: undefined, alt: '' });
	};
	const onClickRemoveImage = () => {
		setAttributes({ url: undefined, id: undefined, alt: '' });
	};
	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};


	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
	const onChangeBusiness = (newBusiness) => {
		setAttributes({ business: newBusiness });
	};
	const onChangeSector = (newSector) => {
		setAttributes({ sector: newSector });
	};
	const onChangeYears = (newYears) => {
		setAttributes({ years: newYears });
	};
	const onChangeType = (newType) => {
		setAttributes({ type: newType });
	};
	const onChangeCategory = (newCategory) => {
		console.log(newCategory);
		setAttributes({ category: newCategory });
		//setAttributes({ category_label: newCatLabel });
	};

	//This handles cases when img upload did not finish prior to save
	useEffect(() => {
		//if no ID is set and the BlobURL is being used, just reset and allow to upload again.
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: '',
			});
		}
	}, []);

	//This will clear any existing BlobURL from memory
	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL(undefined);
		}
	}, [url]);

	//set focus on the next likely element to edit, post image select
	useEffect(() => {
		//this only set focus on title input when adding new image (not removing, or replacing one)
		if (url && !previousURL && isSelected) {
			titleRef.current.focus();
		}
	}, [url, previousURL]);

	return (
		<>
			{/* This will allow a change within this template but keep the value in the Media Library intact */}
			<InspectorControls>
				<PanelBody label={__('Image Settings', 'investment')}>
					<SelectControl
						label={__('Image Sizes', 'investment')}
						options={getImageSizeOptions()}
						value={url}
						onChange={onChangeImageSize}
					/>
					<TextareaControl
						label={__('Alt Text', 'investment')}
						onChange={onChangeAltText}
						value={alt}
						help={__(
							'Alternative text describes your image to people who cannot see it. Add a short description with key details',
							'investment'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__('Replace Image', 'investment')}
						onSelect={onSelectImage}
						onSelectURL={onSelectImageURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={onClickRemoveImage}>
						{__('Remove Image', 'investment')}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				{url && (
					<div
						className={`wp-block-custom-block-investment-img${isBlobURL(url) ? ' is-loading' : ''}`}
					>
						<img src={url} alt={alt}/>
						{isBlobURL(url) && <Spinner/>}
					</div>
				)}
				<MediaPlaceholder
					onSelect={onSelectImage}
					onSelectURL={onSelectImageURL}
					onError={onUploadError}
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={url}
					notices={noticeIU}
				/>
				{/* TODO: Can we build these in a loop? */}
				<TextControl
					ref={titleRef}
					label={__('Investment Title', 'investment')}
					placeholder={__('Investment Title', 'investment')}
					onChange={onChangeTitle}
					value={title}
					allowedFormats={[]}
				/>
				<TextControl
					label={__('Business', 'investment')}
					placeholder={__('Business', 'investment')}
					onChange={onChangeBusiness}
					value={business}
					allowedFormats={[]}
				/>
				<TextControl
					label={__('Sector', 'investment')}
					placeholder={__('Sector', 'investment')}
					onChange={onChangeSector}
					value={sector}
					allowedFormats={[]}
				/>
				<TextControl
					label={__('Years', 'investment')}
					placeholder={__('Years', 'investment')}
					onChange={onChangeYears}
					value={years}
					allowedFormats={[]}
				/>
				<TextControl
					label={__('Type of Investment', 'investment')}
					placeholder={__('Type of Investment', 'investment')}
					onChange={onChangeType}
					value={type}
					allowedFormats={[]}
				/>
				<SelectControl
					label={__('Category', 'investment')}
					value={category}
					options={ [
						//TODO: move this from code. Place in plugin settings, maybe?
						{ label: 'Private Equity Investments', value: 'private-equity-investments' },
						{ label: 'Operating Experience', value: 'operating-experience' },
					] }
					onChange={onChangeCategory}
				/>
			</div>
		</>
	);
}

export default withNotices(Edit);
