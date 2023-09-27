import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

export default function save({ attributes }) {
	const { title, url, alt, id, business, sector, years, type, category  } = attributes;
	return (
		<div {...useBlockProps.save()}>
				<div className={`wp-block-custom-investment-card ${category}`}>
					<div className="investment-img-container">
						<img className="investment-logo" src={url} alt={alt ? (alt) : (title) } title={title} />
					</div>
					<ul className="card-ul">
						{business &&
						 <li className="business-item" >{business}</li>}
						 {business &&
						 <li className="sector-item" >{sector}</li>}
						 {years &&
						 <li className="years-item">{years}</li>}
						 {type &&
						 <li className="type-item">{type}</li>}
					</ul>
				</div>
		</div>
	);
}
