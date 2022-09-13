const Draft = require('../models/draft');
const User = require('../models/users');
const Creater = require('../models/creators');

exports.createDraft = async (req, res) => {
  try {
    const { formDataOne, formDataTwo, formDataFive, formDataSix, id, step } =
      req.body;
    console.log('formDataTwo', formDataTwo);
    const newCreator = await Creater.findById(id);
    if (!newCreator) return res.status(404).send('Creator does not found');
    const {
      course_name,
      // gameName,
      gameName,
      selectedGamename,
      gameLevel,
      gameType,
      gameMood,
      gamePlateForm,
      description
    } = formDataOne;

    const newCourse = {
      course_name: course_name,
      level: gameLevel,
      gameName: gameName,
      gameType: gameType,
      mode: gameMood,
      plateform: gamePlateForm,
      description: description,
      creator: id,
      price: 0,
      // game_id: gameName,
      selectedGamename,
      videos: formDataFive,
      thumbnail: formDataSix,
      step,
      formDataTwo
    };
    let draft = new Draft(newCourse);
    await draft.save();
    res.send({ draft });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateDraft = async (req, res) => {
  const {
    formDataOne,
    formDataTwo,
    formDataFive,
    formDataSix,
    id,
    draftId,
    step
  } = req.body;

  try {
    const {
      course_name,
      gameName,
      selectedGamename,
      gameLevel,
      gameType,
      gameMood,
      gamePlateForm,
      description
    } = formDataOne;
    const draft = await Draft.findByIdAndUpdate(
      draftId,
      {
        course_name: course_name,
        level: gameLevel,
        mode: gameMood,
        gameType: gameType,
        gameName: gameName,
        selectedGamename,
        formDataTwo,
        // plateform: gamePlateForm,
        description: description,
        $push: { videos: formDataFive },
        thumbnail: formDataSix,
        step
      },
      { new: true }
    );
    if (!draft) return res.status(404).send('Draft Not Found');

    res.send({ draft });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDrafts = async (req, res) => {
  try {
    let drafts = await Draft.find({ creator: req.params.id });

    if (!drafts) return res.status(400).send({ message: 'Draft not found' });
    res.json({ drafts });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteDraft = async (req, res) => {
  const draftId = req.params.id;
  try {
    const deletedDraft = await Draft.findByIdAndDelete(draftId);
    if (!deletedDraft) return res.status(404).send('Draft not found');

    res.status(200).send({ draft: deletedDraft });
  } catch (error) {
    res.status(500).send(error);
  }
};
