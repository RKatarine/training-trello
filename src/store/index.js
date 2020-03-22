import { decorate, observable, action } from "mobx";
import sections from "../stubs/sections";

const LEFT_KEY = 37;
const RIGHT_KEY = 39;

class Store {
  constructor() {
    this.sections = sections;
    this.draggedCardInfo = null;
    this.setSections = this.setSections.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.setDraggedCardInfo = this.setDraggedCardInfo.bind(this);
    this.changeCardSection = this.changeCardSection.bind(this);
  }

  setSections(newSections) {
    this.sections = newSections;
  }
  setDraggedCardInfo(newDraggedCardInfo) {
    this.draggedCardInfo = newDraggedCardInfo;
  }

  onChangeSection(editedSection) {
    const { sections } = this;
    const editedSectionIndex = sections.findIndex(
      section => section.id === editedSection.id
    );
    if (editedSectionIndex === -1) {
      return;
    }
    const newSections = [
      ...sections.slice(0, editedSectionIndex),
      { ...sections[editedSectionIndex], ...editedSection },
      ...sections.slice(editedSectionIndex + 1)
    ];
    this.setSections(newSections);
  }

  changeCardSection({ keyCode }) {
    const { draggedCardInfo, sections } = this;
    if (!draggedCardInfo) {
      return;
    }
    const currentSectionIndex = sections.findIndex(
      section => section.id === draggedCardInfo.sectionId
    );
    const cardIndex = sections[currentSectionIndex].cards.findIndex(
      card => card.id === draggedCardInfo.cardId
    );
    let nextSectionIndex = 0;
    if (keyCode === LEFT_KEY && currentSectionIndex !== 0) {
      nextSectionIndex = currentSectionIndex - 1;
    }
    if (keyCode === RIGHT_KEY && currentSectionIndex !== sections.length - 1) {
      nextSectionIndex = currentSectionIndex + 1;
    }
    if (currentSectionIndex === nextSectionIndex) {
      return;
    }
    let nextSection = sections[nextSectionIndex];
    let currentSection = sections[currentSectionIndex];
    nextSection = {
      ...nextSection,
      cards: [...nextSection.cards, currentSection.cards[cardIndex]]
    };
    currentSection = {
      ...currentSection,
      cards: currentSection.cards.filter((_, index) => index !== cardIndex)
    };
    const newSections =
      nextSectionIndex > currentSectionIndex
        ? [
            ...sections.slice(0, currentSectionIndex),
            currentSection,
            ...sections.slice(currentSectionIndex + 1, nextSectionIndex),
            nextSection,
            ...sections.slice(nextSectionIndex + 1)
          ]
        : [
            ...sections.slice(0, nextSectionIndex),
            nextSection,
            ...sections.slice(nextSectionIndex + 1, currentSectionIndex),
            currentSection,
            ...sections.slice(currentSectionIndex + 1)
          ];
    this.setDraggedCardInfo({
      cardId: draggedCardInfo.cardId,
      sectionId: nextSectionIndex
    });
    this.setSections(newSections);
  }
}

decorate(Store, {
  sections: observable,
  draggedCardInfo: observable,
  setSections: action,
  setDraggedCardInfo: action,
  onChangeSection: action,
  changeCardSection: action
});

export const appStore = new Store();
