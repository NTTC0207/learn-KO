import './style.css';
import { type Observable, observable, applyBindings } from 'knockout'
import { AsyncState, getAllPeople, getPeopleId } from './request';
import { PeopleProps } from './interface';

class CounterViewModel {
  show: Observable<boolean>
  searchValue: Observable<string>
  peopleList: Observable<PeopleProps[] | null>
  isLoading: Observable<boolean>
  personDetail: Observable<PeopleProps | null>
  detailLoader: Observable<boolean>
  name: Observable<string>

  constructor() {

    this.show = observable(true)
    this.searchValue = observable('')
    this.peopleList = observable<PeopleProps[] | null>(null);
    this.personDetail = observable<PeopleProps | null>(null)
    this.isLoading = observable(false)
    this.detailLoader = observable(false)
    this.name = observable('')

    // this will call the data when constuctor is load, like useEffect in react
    this.loadData();
  }

  async loadData() {
    this.isLoading(true)
    try {
      const people: AsyncState<PeopleProps[] | null> = await getAllPeople();
      if (people && people.results) {
        this.peopleList(people.results)
      }
    }
    catch (err) { console.log('err', err) }
    finally {
      this.isLoading(false)
    }
  }

  async displayPerson(id: string) {
    this.detailLoader(true)
    try {
      const people: PeopleProps | null = await getPeopleId(id);
      if (people ) {
        this.personDetail(people)
      }
    }
    catch (err) { console.log('err', err) }
    finally {
      this.detailLoader(false)
    }
  }
}

applyBindings(new CounterViewModel(), document.querySelector('#knockout-app'));
