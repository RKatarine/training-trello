import Desk from "./Desk";
import { compose, withHandlers } from "recompose";

export default compose(
  withHandlers({
    onChangeSection: ({ sections, onChange }) => editedSectionData => {
      const editedSectionIndex = sections.findIndex(
        section => section.id === editedSectionData.id
      );
      if (editedSectionIndex === -1) {
        return;
      }
      const newSections = [
        ...sections.slice(0, editedSectionIndex),
        {
          ...sections[editedSectionIndex],
          ...editedSectionData
        },
        ...sections.slice(editedSectionIndex + 1)
      ];
      console.log(newSections);
      onChange(newSections);
    }
  })
)(Desk);
