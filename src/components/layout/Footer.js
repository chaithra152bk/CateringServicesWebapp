import * as React from 'react';
import './layoutStyles.css';
import constant from '../../shared/constant';

export default class Footer extends React.PureComponent {

	render() {
		const { t } = this.props;
		return <footer className="footer fixed-bottom">
			
			<div className="row copyright">
				<div className="container">
					{/* <p>{t('footer.copy_right')}</p> */}
				</div>
			</div>
		</footer>

	}

}