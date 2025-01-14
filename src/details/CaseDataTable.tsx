import { ChaseCaseProps } from './types';
import styles from './CaseDataTable.module.css';
import { isSocialLink } from '../media/utils';
import { ExternalLinkList } from './ExternalLinkList';

export function CaseDataTable({ chaseCase }: ChaseCaseProps) {
  const externalLinks = chaseCase.photo_video.filter(
    (link) => !isSocialLink(link)
  );
  const summaryLinks = chaseCase.account_summary
    ? [chaseCase.account_summary]
    : [];

  return (
    <table className={styles.dataTable}>
      <tbody>
        <tr>
          <td>time start</td>
          <td>{chaseCase.time_start}</td>
        </tr>
        <tr>
          <td>time end</td>
          <td>{chaseCase.time_end}</td>
        </tr>
        <tr>
          <td>country</td>
          <td>{chaseCase.country}</td>
        </tr>
        <tr>
          <td>coordinates</td>
          <td>{`(${chaseCase.lat}, ${chaseCase.lon})`}</td>
        </tr>
        <tr>
          <td>magnitude</td>
          <td>{chaseCase.magnitude}</td>
        </tr>
        <tr>
          <td>features</td>
          <td>{chaseCase.features.join(', ')}</td>
        </tr>
        <tr>
          <td>records</td>
          <td>{chaseCase.records.join(', ')}</td>
        </tr>
        <tr>
          <td>nickname</td>
          <td>{chaseCase.nickname}</td>
        </tr>
        <tr>
          <td>outbreak</td>
          <td>{chaseCase.outbreak}</td>
        </tr>
        <tr>
          <td>notes</td>
          <td>{chaseCase.notes.join(', ')}</td>
        </tr>
        <tr>
          <td>user comments</td>
          <td>{chaseCase.user_comments.join(', ')}</td>
        </tr>
        <tr>
          <td>external links</td>
          <td>
            <ExternalLinkList links={externalLinks} />
          </td>
        </tr>
        <tr>
          <td>account summary</td>
          <td>
            <ExternalLinkList links={summaryLinks} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
